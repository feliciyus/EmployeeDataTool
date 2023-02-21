package sanciai.EmployeeDataTool.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
// CrudRepository<Employee, Long>
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
}
