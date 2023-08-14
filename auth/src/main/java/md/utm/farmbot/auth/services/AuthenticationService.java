package md.utm.farmbot.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmbot.auth.clients.BackendClient;
import md.utm.farmbot.auth.dtos.AuthenticatedUserDTO;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final BackendClient backendClient;
    private final TokenService tokenService;

    public AuthenticatedUserDTO getCurrentUserDetails(String jwtToken) {
        return backendClient.getUserDetails(jwtToken);
    }

    public void logout(String publicToken) {
        tokenService.deleteValue(publicToken);
    }
}
