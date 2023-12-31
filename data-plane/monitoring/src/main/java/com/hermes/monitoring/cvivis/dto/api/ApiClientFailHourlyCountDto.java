package com.hermes.monitoring.cvivis.dto.api;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.sql.In;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
public class ApiClientFailHourlyCountDto {
    private Date date;
    private Long count;

    public ApiClientFailHourlyCountDto(String date, Integer hour, Long count) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date newDate = dateFormat.parse(date + " " + hour +":00:00");
        this.date = newDate;
        this.count = count;
    }

    public ApiClientFailHourlyCountDto(String date, Integer hour, Integer count) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date newDate = dateFormat.parse(date + " " + hour +":00:00");
        this.date = newDate;
        this.count = Long.valueOf(count);
    }
}
