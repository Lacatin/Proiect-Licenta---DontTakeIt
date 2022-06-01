package com.licenta.demo.exceptions.handler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenericEntityErrorResponse {
    private int status;
    private String message;
    private long timestamp;
}
