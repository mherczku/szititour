package hu.hm.szititourbackend.util

import java.awt.image.BufferedImage
import java.io.*
import javax.imageio.IIOImage
import javax.imageio.ImageIO
import javax.imageio.ImageWriteParam
import javax.imageio.ImageWriter
import javax.imageio.stream.ImageOutputStream

object ImageCompressor {

    fun compressImage(imageFile: File, compressedImageFile: File) {

        var inputStream: InputStream? = null
        var outputStream: OutputStream? = null
        var imageOutputStream: ImageOutputStream? = null
        var imageWriter: ImageWriter? = null

        try {
            inputStream = FileInputStream(imageFile)
            outputStream = FileOutputStream(compressedImageFile)
            val imageQuality = 0.3f

            //Create the buffered image
            val bufferedImage: BufferedImage = ImageIO.read(inputStream)

            //Get image writers
            val imageWriters = ImageIO.getImageWritersByFormatName("jpg")
            check(imageWriters.hasNext()) { "Writers Not Found!!" }
            imageWriter = imageWriters.next() as ImageWriter
            imageOutputStream = ImageIO.createImageOutputStream(outputStream)

            imageWriter.output = imageOutputStream
            val imageWriteParam = imageWriter.defaultWriteParam

            //Set the compress quality metrics
            imageWriteParam.compressionMode = ImageWriteParam.MODE_EXPLICIT
            imageWriteParam.compressionQuality = imageQuality

            //Created image
            imageWriter.write(null, IIOImage(bufferedImage, null, null), imageWriteParam)

            // close all streams
            inputStream.close()
            outputStream.close()
            imageOutputStream.close()
            imageWriter.dispose()

            // delete temp file
            imageFile.delete()

        } catch (ex: Exception) {
            // close all streams
            inputStream?.close()
            outputStream?.close()
            imageOutputStream?.close()
            imageWriter?.dispose()

            // delete temp file
            imageFile.delete()
            throw ex
        }
    }


}