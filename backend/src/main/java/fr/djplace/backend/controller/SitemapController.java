package fr.djplace.backend.controller;

import fr.djplace.backend.model.Article;
import fr.djplace.backend.repository.ArticleRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class SitemapController {

    private static final String BASE_URL = "https://www.djplace.fr";
    private final ArticleRepository articleRepository;

    public SitemapController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> getSitemap() {
        List<Article> articles = articleRepository.findAll();

        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

        // Page d'accueil
        appendUrl(xml, BASE_URL + "/", LocalDate.now().toString(), "daily", "1.0");

        // Articles publiés uniquement
        for (Article article : articles) {
            if (Boolean.TRUE.equals(article.getPublished()) && article.getSlug() != null) {
                LocalDateTime dateSource = article.getUpdatedAt() != null
                        ? article.getUpdatedAt()
                        : article.getCreatedAt();
                String lastMod = dateSource != null
                        ? dateSource.toLocalDate().format(DateTimeFormatter.ISO_DATE)
                        : LocalDate.now().toString();

                appendUrl(
                        xml,
                        BASE_URL + "/articles/" + escapeXml(article.getSlug()),
                        lastMod,
                        "weekly",
                        "0.8"
                );
            }
        }

        xml.append("</urlset>");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_XML)
                .body(xml.toString());
    }

    private void appendUrl(StringBuilder xml, String loc, String lastMod, String changeFreq, String priority) {
        xml.append("  <url>\n");
        xml.append("    <loc>").append(loc).append("</loc>\n");
        xml.append("    <lastmod>").append(lastMod).append("</lastmod>\n");
        xml.append("    <changefreq>").append(changeFreq).append("</changefreq>\n");
        xml.append("    <priority>").append(priority).append("</priority>\n");
        xml.append("  </url>\n");
    }

    private String escapeXml(String value) {
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&apos;");
    }
}