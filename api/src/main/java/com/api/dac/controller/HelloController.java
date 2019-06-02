/**
 * 
 */
package com.api.dac.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Matheus
 *
 */
@RestController
@RequestMapping(value = "/home")
public class HelloController {
	
	@GetMapping(value = "/ola")
    public String ola() {
        return "ola";
    }
}
