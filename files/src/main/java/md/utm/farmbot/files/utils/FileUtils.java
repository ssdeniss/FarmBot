package md.utm.farmbot.files.utils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FileUtils {

    public static List<Long> stringToLongList(String str) {
        return Arrays.stream(str.split(","))
                .map(
                        part -> Long.valueOf(part)
                )
                .collect(Collectors.toList());
    }

    public static String generateFileName(String code, String fileName) {
        StringBuilder sb = new StringBuilder(code);
        int lastIndex = fileName.lastIndexOf(".");
        if (lastIndex > 0) {
            sb.append(fileName.substring(lastIndex));
        }

        return sb.toString();
    }

    public static String getExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf(".");
        if (lastIndex > 0) {
            return fileName.substring(lastIndex);
        }
        return "";
    }

    public static String concatFileIndexToName(String fileName, int number) {
        StringBuilder sb = new StringBuilder();
        int lastIndex = fileName.lastIndexOf(".");
        if (lastIndex > 0) {
            sb.append(fileName, 0, lastIndex);
            sb.append("(");
            sb.append(number);
            sb.append(")");
            sb.append(getExtension(fileName));
            return sb.toString();
        }
        return fileName;
    }
}
