/*
package sanciai.EmployeeDataTool;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import sanciai.EmployeeDataTool.entity.Employee;
import sanciai.EmployeeDataTool.entity.EmployeeRepository;

public class DatabaseLoader implements CommandLineRunner {
    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Employee("Frodo", "gang@gang.lt", "123"));
    }
}
*/