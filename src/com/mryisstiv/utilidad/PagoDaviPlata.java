package com.mryisstiv.utilidad;

import java.math.BigDecimal;

/**
 * Estrategia de pago con DaviPlata
 */
public class PagoDaviPlata implements EstrategiaPago {
    
    private String numeroCelular;
    
    public PagoDaviPlata(String numeroCelular) {
        this.numeroCelular = numeroCelular;
    }
    
    @Override
    public boolean procesarPago(BigDecimal monto) {
        System.out.println("📱 Procesando pago con DAVIPLATA por $" + monto);
        System.out.println("   Enviando solicitud al número: " + numeroCelular);
        System.out.println("   Pago aprobado automáticamente");
        return true;
    }
    
    @Override
    public String getNombreMetodo() {
        return "DaviPlata";
    }
}