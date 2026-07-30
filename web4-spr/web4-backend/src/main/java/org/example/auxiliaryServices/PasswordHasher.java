package org.example.auxiliaryServices;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Base64;

public class PasswordHasher {

    private static final String PEPPER = "goida";
    private static final int SALT_LENGTH = 16;
    private static final int ITERATIONS = 65536;
    private static final int KEY_LENGTH = 256;

    public static class HashedPassword {
        private final String hash;
        private final String salt;

        public HashedPassword(String hash, String salt) {
            this.hash = hash;
            this.salt = salt;
        }

        public String getHash() {
            return hash;
        }

        public String getSalt() {
            return salt;
        }
    }

    public static HashedPassword hashPassword(String password) {
        byte[] salt = generateSalt();
        String saltStr = Base64.getEncoder().encodeToString(salt);

        String hash = hashWithPBKDF2(password, salt);

        return new HashedPassword(hash, saltStr);
    }

    public static boolean verifyPassword(String password, String storedHash, String storedSalt) {
        byte[] salt = Base64.getDecoder().decode(storedSalt);
        String computedHash = hashWithPBKDF2(password, salt);
        return computedHash.equals(storedHash);
    }

    private static byte[] generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        new SecureRandom().nextBytes(salt);
        return salt;
    }

    private static String hashWithPBKDF2(String password, byte[] salt) {
        try {
            PBEKeySpec spdec = new PBEKeySpec((password + PEPPER).toCharArray(), salt, ITERATIONS, KEY_LENGTH);
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            byte[] hash = skf.generateSecret(spdec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка хэширования", e);
        }
    }
}
