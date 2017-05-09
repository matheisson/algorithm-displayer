package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by levente on 2017.05.02..
 */
@Controller
public class InputController {

    @GetMapping("/")
    public String main(){
        return "home";
    }


    @RequestMapping(value = "/data", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public ResponseEntity<List> getAjax(@RequestBody int[] data) {
        List<int[]> sorted = bubbleSort(data);
        return new ResponseEntity<>(sorted, HttpStatus.OK);
    }

    private List<int[]> bubbleSort(int[] array){
        List<int[]> iteration = new ArrayList<>();
        int temp;

        for (int i = 0; i < array.length; i++) {
            for (int j = 1; j < array.length-i; j++) {
                if (array[j] < array[j-1]) {
                    temp = array[j-1];
                    array[j-1] = array[j];
                    array[j] = temp;
                    // copy actual array state and add to the class variable list!
                    int[] partSorted = new int[array.length];
                    for (int n = 0; n < array.length; n++){
                        partSorted[n] = array[n];
                    }
                    iteration.add(partSorted);
                }
            }
        }
        return iteration;
    }

}
