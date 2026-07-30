package org.example.repository;

import org.example.dataBase.Points;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PointRepository extends JpaRepository<Points, Integer> {
    @Query("SELECT p FROM Points p WHERE p.user.id = :userId ORDER BY p.id DESC")
    List<Points> findByUserId(@Param("userId") int userId);
}
