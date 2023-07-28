INSERT INTO department (id, department_name)
VALUES  (1, "The Arts"),
        (2, "STEM"),
        (3, "Language Arts"),
        (4, "Humanities");
    
    
INSERT INTO roles (id, title, salary, department_id)
VALUES  (100, "Art Teacher", 45000, 1),
        (101, "Music Teacher", 45000, 1),
        (102, "Science Teacher", 45000, 2),
        (103, "Math Teacher", 45000, 2),
        (104, "Social Studies Teacher", 45000, 4),
        (105, "English Teacher", 45000, 3),
        (106, "STEM Assistant", 30000, 2);
 

INSERT INTO employee (id, first_name, last_name, roles_id)
VALUES  (1000, "Frida", "Kahlo", 100),
        (1001, "Mary", "Shelley", 105),
        (1002, "Marie", "Curie", 102),
        (1003, "Kamala", "Harris", 104),
        (1004, "Dolores", "O'Riordan", 101),
        (1005, "Sophie", "Germain", 106),
        (1006, "Artemisia", "Gentileshi", 100),
        (1007, "Malala", "Yousafzai", 104),
        (1008, "Agatha", "Christie", 105),
        (1009, "Mary", "Jackson", 103);