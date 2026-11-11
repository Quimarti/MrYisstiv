package com.mryisstiv.utilidad;

import java.math.BigDecimal;

/**
 * Interfaz Strategy para procesar diferentes métodos de pago
 * @author Ana Maria Quimbayo
 */
public interface EstrategiaPago {
    
    /**
     * Procesa el pago de un pedido
     * @param monto - El monto total a pagar
     * @return boolean - true si el pago fue exitoso
     */
    boolean procesarPago(BigDecimal monto);
    
    /**
     * Retorna el nombre del método de pago
     */
    String getNombreMetodo();
}