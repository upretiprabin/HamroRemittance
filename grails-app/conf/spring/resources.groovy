import com.remitapp.um.RemoveLoginPromptFilter
import com.remitapp.um.UserPasswordEncoderListener
import org.springframework.boot.web.servlet.FilterRegistrationBean

// Place your Spring DSL code here
beans = {
    userPasswordEncoderListener(UserPasswordEncoderListener)
    removeLoginPromptFilter(RemoveLoginPromptFilter)
    myFilterDeregistrationBean(FilterRegistrationBean) {
        filter = ref('removeLoginPromptFilter')
        enabled = false
    }
}
