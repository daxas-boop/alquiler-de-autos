DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  manufacture_year NUMBER NOT NULL,
  kilometer_mileage NUMBER NOT NULL,
  color TEXT NOT NULL,
  has_air_conditioning TEXT NOT NULL,
  passengers NUMBER NOT NULL,
  transmission TEXT NOT NULL,
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);

INSERT INTO cars(brand, model, manufacture_year, kilometer_mileage, color, has_air_conditioning, passengers, transmission) VALUES("Ford", "Ka", "2015", 200000, 'Gris', "Si", 4, "Manual");