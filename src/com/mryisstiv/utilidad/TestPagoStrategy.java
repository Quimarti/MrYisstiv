package com.mryisstiv.utilidad;

import java.math.BigDecimal;

public class TestPagoStrategy {

    public static void main(String[] args) {
        BigDecimal monto = new BigDecimal("29000.00");
        
        System.out.println("=== PRUEBA 1: PAGO EN EFECTIVO ===");
        EstrategiaPago pago1 = new PagoEfectivo();
        System.out.println("Método: " + pago1.getNombreMetodo());
        pago1.procesarPago(monto);
        
        System.out.println("\n=== PRUEBA 2: PAGO CON NEQUI ===");
        EstrategiaPago pago2 = new PagoNequi("3001234567");
        System.out.println("Método: " + pago2.getNombreMetodo());
        pago2.procesarPago(monto);
        
        System.out.println("\n=== PRUEBA 3: PAGO CON DAVIPLATA ===");
        EstrategiaPago pago3 = new PagoDaviPlata("3009876543");
        System.out.println("Método: " + pago3.getNombreMetodo());
        pago3.procesarPago(monto);
    }
}