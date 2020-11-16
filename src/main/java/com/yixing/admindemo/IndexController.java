package com.yixing.admindemo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 描述：
 *
 * @author 小谷
 * @Date 2020/10/27 13:57
 */
@Controller
public class IndexController {

    private Logger log = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping("/index")
    public String index() {
        log.info("进入首页");
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        log.info("进入登录页");
        return "login";
    }
}
