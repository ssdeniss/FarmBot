package md.utm.farmbot.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.auth.dtos.UsernamePasswordCredentialsDTO;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocalAuthenticationService {

    public String localAuthentication(UsernamePasswordCredentialsDTO credentials){
        // TODO: check for valid pasword / username in local db and return a opakue token
        return "some_token";
    }
}
