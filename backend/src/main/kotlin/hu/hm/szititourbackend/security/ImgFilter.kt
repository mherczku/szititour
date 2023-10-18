package hu.hm.szititourbackend.security

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode
import com.fasterxml.jackson.databind.node.TextNode
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.util.ContentCachingRequestWrapper
import org.springframework.web.util.ContentCachingResponseWrapper
import java.nio.charset.StandardCharsets
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Component
class ImgPropertyFilter : OncePerRequestFilter() {

    val myLogger: Logger = LoggerFactory.getLogger(javaClass)

    @Autowired
    var securityTokenService: SecurityTokenService? = null

    private val objectMapper = ObjectMapper()
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {

        myLogger.debug("Inside ImgPropertyFilter")

        val req = ContentCachingRequestWrapper(request)
        val resp = ContentCachingResponseWrapper(response)

        // Continue the filter chain
        filterChain.doFilter(req, resp)

        val responseBody = resp.contentAsByteArray

        // Check if the response content type is JSON
        if (resp.contentType != null && resp.contentType.contains("application/json")) {
            // Modify the "img" property in the JSON response
            val modified = modifyImgProperty(String(responseBody, StandardCharsets.UTF_8))
            if(modified != null) {
                resp.resetBuffer()
                resp.setContentLength(modified.length)
                response.contentType = "application/json"
                response.characterEncoding = "UTF-8"
                resp.getOutputStream().write(modified.toByteArray(StandardCharsets.UTF_8))
                resp.getOutputStream().flush()
                resp.copyBodyToResponse()
            } else {
                resp.copyBodyToResponse()
            }
        }
        else {
            resp.copyBodyToResponse()
        }
    }

    fun traverseJsonNode(node: JsonNode): Boolean {
        var modified = false
        if (node.isObject) {
            node.fields().forEachRemaining { (fieldName, fieldValue): Map.Entry<String, JsonNode> ->
                if ("img" == fieldName) {
                    val value = fieldValue.asText()
                    if(!value.contains("https") && !value.contains("resToken") && value.isNotBlank()) {
                        (node as ObjectNode).set<JsonNode>(fieldName, TextNode(securityTokenService?.genImgUrl(imagePath = value, "-1")))
                        modified = true
                    }
                } else {
                    // Recursively traverse the field's value
                    modified = (traverseJsonNode(fieldValue) || modified)
                }
            }
        } else if (node.isArray) {
            for (arrayElement in node) {
                // Recursively traverse each element in the array
                modified = (traverseJsonNode(arrayElement) || modified)
            }
        }
        return modified
    }

    private fun modifyImgProperty(content: String): String? {
        // Read the response body as a JSON object

        val jsonNode = objectMapper.readTree(content)

        // Check if the JSON contains the "img" property
        if(traverseJsonNode(jsonNode)) {
            return objectMapper.writeValueAsString(jsonNode)
        }
        return null
    }
}