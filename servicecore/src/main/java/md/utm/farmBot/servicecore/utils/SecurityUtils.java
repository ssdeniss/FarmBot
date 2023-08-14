package md.utm.farmBot.servicecore.utils;

import md.utm.farmBot.servicecore.configs.security.PlatformUserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class SecurityUtils {

    private SecurityUtils() {
    }

    public static boolean isAnonymous() {
        return !isAuthenticated();
    }

    public static boolean isAuthenticated() {
        return (SecurityContextHolder.getContext() != null)
                && (SecurityContextHolder.getContext().getAuthentication() != null)
                && (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != null);
    }

    public static PlatformUserDetails getUserDetails() {
        return isAuthenticated()
                ? (PlatformUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
                : null;
    }

    public static List<String> getRoles() {
        return isAuthenticated()
                ? SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList())
                : Collections.emptyList();
    }

    public static boolean hasAnyRole(String... roles) {
        return isAuthenticated() && getRoles().stream().anyMatch(role -> contains(roles, role));
    }

    private static boolean contains(String[] array, String value) {
        for (String el : array) {
            if (el.equals(value)) {
                return true;
            }
        }
        return false;
    }

    public static boolean hasAllRoles(String... roles) {
        return isAuthenticated() && getRoles().containsAll(Arrays.asList(roles));
    }

}
