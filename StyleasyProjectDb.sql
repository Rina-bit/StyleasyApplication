-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema styleasyapplication
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema styleasyapplication
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `styleasyapplication` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `styleasyapplication` ;

-- -----------------------------------------------------
-- Table `styleasyapplication`.`address_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`address_details` (
  `id` BIGINT NOT NULL,
  `address1` VARCHAR(1024) NULL DEFAULT NULL,
  `address2` VARCHAR(1024) NULL DEFAULT NULL,
  `city` VARCHAR(100) NULL DEFAULT NULL,
  `country` VARCHAR(100) NULL DEFAULT NULL,
  `distict` VARCHAR(100) NULL DEFAULT NULL,
  `insertion_date` DATETIME NULL DEFAULT NULL,
  `is_active` TINYINT(1) NULL DEFAULT '1',
  `pincode` VARCHAR(6) NULL DEFAULT NULL,
  `state` VARCHAR(100) NULL DEFAULT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  `userid` BIGINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`customer_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`customer_details` (
  `id` BIGINT NOT NULL,
  `emailid` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `insertion_date` DATETIME NULL DEFAULT NULL,
  `is_active` TINYINT(1) NULL DEFAULT '1',
  `mobile_number` VARCHAR(255) NULL DEFAULT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  `userid` BIGINT NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`feedback` (
  `feedback_id` BIGINT NOT NULL,
  `product_name` VARCHAR(255) NULL DEFAULT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  `feedback` VARCHAR(255) NULL DEFAULT NULL,
  `insertion_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`feedback_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`hibernate_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`my_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`my_order` (
  `orderid` BIGINT NOT NULL,
  `productid` BIGINT NULL DEFAULT NULL,
  `userid` BIGINT NULL DEFAULT NULL,
  `insertion_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`orderid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`product` (
  `productid` BIGINT NOT NULL,
  `from_date` VARCHAR(255) NULL DEFAULT NULL,
  `gender_type` VARCHAR(255) NULL DEFAULT NULL,
  `product_name` VARCHAR(255) NULL DEFAULT NULL,
  `product_price` VARCHAR(255) NULL DEFAULT NULL,
  `quentity` VARCHAR(255) NULL DEFAULT NULL,
  `size` VARCHAR(255) NULL DEFAULT NULL,
  `to_date` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  `userid` BIGINT NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `insertion_date` DATETIME NULL DEFAULT NULL,
  `is_active` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`productid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`rental`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`rental` (
  `rentalid` BIGINT NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `customer_name` VARCHAR(255) NULL DEFAULT NULL,
  `from_date` VARCHAR(255) NULL DEFAULT NULL,
  `mobile_number` VARCHAR(255) NULL DEFAULT NULL,
  `price` VARCHAR(255) NULL DEFAULT NULL,
  `productid` BIGINT NULL DEFAULT NULL,
  `size` VARCHAR(255) NULL DEFAULT NULL,
  `to_date` VARCHAR(255) NULL DEFAULT NULL,
  `userid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`rentalid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `styleasyapplication`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `styleasyapplication`.`user` (
  `user_id` BIGINT NOT NULL,
  `emailid` VARCHAR(255) NULL DEFAULT NULL,
  `first_name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `mobile_number` VARCHAR(255) NULL DEFAULT NULL,
  `insertion_date` DATETIME NULL DEFAULT NULL,
  `is_active` TINYINT(1) NULL DEFAULT '1',
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(10) NOT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
