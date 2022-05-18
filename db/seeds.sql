USE employee_db;

INSERT INTO department (name)
VALUES  ("Shoes"),
        ("Juniors"),
        ("Intimates")
        ("Cosmetics"),
        ("Formal"),
      
    
INSERT INTO roles (id, title, salary, department_id)
VALUES  ("Sales", 65000, 3),
        ("Cashier", 55000, 3),
        ("Cleaner", 45000, 3),
        ("Stretcher", 68000, 1),
        ("Sprayer", 58000, 1),
        ("Makeup", 77000, 4),
        ("Dresser", 47000, 5),
        ("Fitter", 88000, 1),
        ("Clown", 53000, 2),
        ("Perfume", 660000, 4),
        ("Seamstress", 370000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Natalya', "C", 1),
        ('Nancy', "Reagan", 2),
        ("Barbabra", "Bush", 3),
        ("Hilary", "Clinton", 4),
        ("Maime", "Eisenhaur", 5),
        ("Martha", "Washington", 7),
        ("Abigail", "Adams", 6),
        ("Michelle", "Obama", 8),
        ("Jackie", "Kennedy", 9),
        ("Betty", "Ford", 10),
        ("Jill", "Biden", 11);


      