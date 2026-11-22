package fr.djplace.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file, String category) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est vide.");
        }

        String sanitizedCategory = (category == null || category.isBlank())
                ? "general"
                : category.toLowerCase().replaceAll("[^a-z0-9-_]", "");

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "djplace/" + sanitizedCategory,
                            "resource_type", "image"
                    )
            );

            Object secureUrl = uploadResult.get("secure_url");
            if (secureUrl == null) {
                throw new RuntimeException("URL sécurisée absente dans la réponse Cloudinary.");
            }

            return secureUrl.toString();
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'envoi de l'image vers Cloudinary.", e);
        }
    }
}