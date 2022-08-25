CREATE TABLE `db_galderman`.`report_product` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `visit_id` VARCHAR(50) NULL,
    `product_id` INT(10) NULL,
    `jumlah_product` INT(10) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

