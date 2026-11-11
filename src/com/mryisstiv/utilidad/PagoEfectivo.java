package com.mryisstiv.utilidad;

import java.math.BigDecimal;

/**
 * Estrategia de pago en efectivo (contra entrega)
 */
public class PagoEfectivo implements EstrategiaPago {
    
    @Override
    public boolean procesarPago(BigDecimal monto) {
        System.out.println(" Procesando pago en EFECTIVO por $" + monto);
        System.out.println("   El cliente pagará al recibir el domicilio");
        return true;
    }
    
    @Override
    public String getNombreMetodo() {
        return "Efectivo";
    }
}