package md.utm.farmBot.servicecore.configs.security;

import java.util.Collection;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@EqualsAndHashCode
public class PlatformUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;

    @Getter
    private final Long id;

    private final String username;

    @Getter
    private final Collection<? extends GrantedAuthority> authorities;

    @Getter
    private final String sessionIndex;

    public PlatformUserDetails(Long id, String username, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.sessionIndex = null;
    }

    public PlatformUserDetails(Long id, String username, Collection<? extends GrantedAuthority> authorities, String sessionIndex) {
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.sessionIndex = sessionIndex;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return "";
    }



}
