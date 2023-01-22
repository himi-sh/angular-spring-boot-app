package com.config;

import org.springframework.security.core.GrantedAuthority;

public enum Roles implements GrantedAuthority {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER");

    private String role;

    Roles(String role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role;
    }
}

