package md.utm.farmbot.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.auth.clients.BackendClient;
import md.utm.farmbot.auth.dtos.AuthenticatedUserDTO;
import md.utm.farmbot.auth.dtos.UsernamePasswordCredentialsDTO;
import md.utm.farmbot.auth.token.JwtTokenProvider;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocalAuthenticationService {

    private final BackendClient backendClient;
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;

    public String localAuthentication(UsernamePasswordCredentialsDTO credentials){
        String token = tokenProvider.generateServiceToken(LocalAuthenticationService.class.getName());
        AuthenticatedUserDTO user = backendClient.authenticate(credentials, token);
        var opaqueToken = generateOpaqueToken();
        var jwtToken = tokenProvider.generateToken(
                Map.of(
                        JwtTokenProvider.ISSUER, LocalAuthenticationService.class.getName(),
                        JwtTokenProvider.IDENTIFIER, user.getId(),
                        JwtTokenProvider.SUBJECT, user.getUsername()
                )
        );

        tokenService.setValue(opaqueToken, jwtToken);
        return opaqueToken;
    }

    public static String generateOpaqueToken() {
        return IntStream.range(0, 3)
                .mapToObj((v) -> UUID.randomUUID().toString())
                .collect(Collectors.joining())
                .replaceAll("-", "");
    }
}
