package sanciai.EmployeeDataTool.controller;

import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sanciai.EmployeeDataTool.entity.Employee;
import sanciai.EmployeeDataTool.entity.EmployeeRepository;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
public class EmployeeController {
    @Autowired
    EmployeeRepository service;

    @PostMapping("/upload")
    public String uploadData(@RequestParam("file")MultipartFile file) throws Exception {
        List<Employee> employeeList = new ArrayList<>();
        InputStream inputStream = file.getInputStream();
        CsvParserSettings setting = new CsvParserSettings();
        setting.setHeaderExtractionEnabled(true);
        CsvParser csvParser = new CsvParser(setting);
        List<Record> parseAllRecords = csvParser.parseAllRecords(inputStream);
        parseAllRecords.forEach(record -> {
            Employee employee = new Employee();
            employee.setName(record.getString("Name"));
            employee.setEmail(record.getString("Email"));
            employee.setPhoneNumber(record.getString("Phone_Number"));
            employeeList.add(employee);
        });
        service.saveAll(employeeList);
        return "Upload success";
    }
}
