package md.utm.farmbot.backend.services;

import io.vavr.control.Either;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmBot.servicecore.exceptions.DataNotFoundException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import md.utm.farmbot.backend.dtos.auth.ChangePasswordRequest;
import md.utm.farmbot.backend.repositories.UserRepository;
import md.utm.farmbot.backend.models.User;
import md.utm.farmbot.backend.utils.PasswordAttributes;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User save(User user){
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Either<PlatformException, User> findById(Long id) {
        return userRepository.findById(id)
                .map(Either::<PlatformException, User>right)
                .orElseGet(() -> Either.left(
                                new DataNotFoundException("errors.md.utm.farmBot.users.users.not-found " + id)
                        )
                );
    }

    public void changePassword(User user, ChangePasswordRequest payload) {

        Boolean meetPattern = PasswordAttributes.PATTERN.matcher(payload.getNewPassword()).matches();
        Boolean notIdentical = !payload.getPassword().equals(payload.getNewPassword());
        Boolean meetLength = payload.getNewPassword().length() >= PasswordAttributes.MIN_LENGTH;

        if(!meetPattern){
            throw new BadRequestException("Parola trebuie sa conțină o literă majusculă, una minusculă și o cifră");
        }
        if(!notIdentical){
            throw new BadRequestException("Parola nouă nu trebuie sa coincidă cu parola curentă");
        }
        if(!meetLength){
            throw new BadRequestException("Parola trebuie sa aibă marimea minimă de " + PasswordAttributes.MIN_LENGTH + " caractere");
        }

        if(userRepository.save(user) == null ){
            throw new PlatformException("A apărut o eroare la salvarea parolei");
        }
    }

    public boolean checkPassword(String password, String hash) {
        return passwordEncoder.matches(password, hash);
    }
}
