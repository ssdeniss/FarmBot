package md.utm.farmbot.backend.utils;

import md.utm.farmbot.backend.clients.FilesClient;
import md.utm.farmbot.backend.dtos.files.Base64FileDTO;
import md.utm.farmbot.backend.dtos.files.FileDTO;
import md.utm.farmbot.backend.models.User;

import java.util.List;

public class UserUtils {

    public static void setAvatarId(User user, Base64FileDTO imageFile, FilesClient filesClient, String token){
        if(user.getAvatarId() != null) {
            filesClient.removeFiles(user.getAvatarId().toString(), token);
            user.setAvatarId(null);
        }
        if(imageFile != null && imageFile.getContent() != null) {
            imageFile.setName("Avatar_" + user.getUsername());
            imageFile.setMimetype("image/*");
            imageFile.setPath(FilesAttributes.USER_AVATAR_PATH + user.getUsername());

            List<FileDTO> files = filesClient.uploadFiles(List.of(imageFile), token);
            if (files != null && !files.isEmpty()) {
                Long imageId = files.get(0).getId();
                user.setAvatarId(imageId);
            }
        }
    }
}
