USE company_db;

-- Department Seeding
INSERT INTO department (name) VALUE ('Finance')
INSERT INTO department (name) VALUE ('Legal')
INSERT INTO department (name) VALUE ('Logistics')
INSERT INTO department (name) VALUE ('Service')

-- Role Seeding
INSERT INTO role (title, salary, department_id) 
VALUE ('Senior Accountant', 110000, 1)
INSERT INTO role (title, salary, department_id) 
VALUE ('Junior Accountant', 65000, 1)
INSERT INTO role (title, salary, department_id) 
VALUE ('Lawyer', 135000, 2)
INSERT INTO role (title, salary, department_id) 
VALUE ('Paralegal', 60000, 2)
INSERT INTO role (title, salary, department_id) 
VALUE ('Operations', 75000, 3)
INSERT INTO role (title, salary, department_id) 
VALUE ('Production Worker', 40000, 3)
INSERT INTO role (title, salary, department_id) 
VALUE ('Mechanic', 65000, 4)
INSERT INTO role (title, salary, department_id) 
VALUE ('Apprentice', 40000, 4)


-- Employee Seeding
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Peter', 'Barbee', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Anna', 'Freeges', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Maria', 'Souriol', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Kyle', 'Rix', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Dan', 'Shelton', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('James', 'Moore', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Cania', 'Lee', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Jin', 'Kim', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Brian', 'Morton', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Emilio', 'Castroneves', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Erwin', 'Leitt', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Rudy', 'Huxtable', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Peter', 'Griffin', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Malcom', 'Harris', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Bernard', 'Sanders', 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Dan', 'Alford', 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Kasey', 'DeLong', 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Juan', 'Montoya', 8, null);

