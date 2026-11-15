package fr.djplace.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    
    @Value("${app.frontend.url}")
    private String frontendUrl;

    private static final String BASE_UPLOAD_DIR = "uploads/";

    public String storeFile(MultipartFile file, String category) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est vide.");
        }

        try {
            // Nettoyer le nom de la catégorie pour le dossier
            String sanitizedCategory = category.toLowerCase().replaceAll("[^a-z0-9-_]", "");
            String targetDir = BASE_UPLOAD_DIR + sanitizedCategory + "/";

            File directory = new File(targetDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Générer un nom unique pour éviter les conflits
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + 
                (originalFileName != null ? originalFileName.replaceAll("\\s+", "_") : "image.jpg");
            
            Path filePath = Paths.get(targetDir + uniqueFileName);
            Files.write(filePath, file.getBytes());

            // TODO mettre l'url en dynamique selon l'environnement (dev, prod, etc.)
           // Force l'URL vers le back-end Spring Boot
            return "https://api.djplace.fr/uploads/" + sanitizedCategory + "/" + uniqueFileName;

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la sauvegarde du fichier sur le serveur.", e);
        }
    }
}