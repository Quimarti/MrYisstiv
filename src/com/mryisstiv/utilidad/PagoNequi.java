package com.mryisstiv.utilidad;

import java.math.BigDecimal;

/**
 * Estrategia de pago con Nequi
 */
public class PagoNequi implements EstrategiaPago {
    
    private String numeroCelular;
    
    public PagoNequi(String numeroCelular) {
        this.numeroCelular = numeroCelular;
    }
    
    @Override
    public boolean procesarPago(BigDecimal monto) {
        System.out.println("📱 Procesando pago con NEQUI por $" + monto);
        System.out.println("   Enviando solicitud al número: " + numeroCelular);
        System.out.println("   Pago aprobado automáticamente");
        return true;
    }
    
    @Override
    public String getNombreMetodo() {
        return "Nequi";
    }
}