package sanciai.EmployeeDataTool.controller;

import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sanciai.EmployeeDataTool.entity.Employee;
import sanciai.EmployeeDataTool.entity.EmployeeRepository;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class EmployeeController {
    @Autowired
    EmployeeRepository service;

    /**
     * Endpoint for uploading employee data in CSV format.
     *
     * @param file the uploaded CSV file
     * @return a Map containing a success message
     * @throws Exception if there is an error while parsing the CSV file
     */
    @PostMapping("/upload")
    public Map<String, String> uploadData(@RequestParam("file") MultipartFile file) throws Exception {
        InputStream inputStream = file.getInputStream();
        CsvParserSettings setting = new CsvParserSettings();
        setting.setHeaderExtractionEnabled(true);
        CsvParser csvParser = new CsvParser(setting);

        List<Employee> parsedEmployeeList = csvParser.parseAllRecords(inputStream).stream()
                .map(record -> {
                    Employee employee = new Employee();
                    employee.setName(record.getString("Name"));
                    employee.setEmail(record.getString("Email"));
                    employee.setPhoneNumber(record.getString("Phone_Number"));

                    return employee;
                })
                .collect(Collectors.toList());
        service.saveAll(parsedEmployeeList);
        return Map.of("message", "Upload success");
    }


}
