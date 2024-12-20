package es.santander.ascender;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class ProductoTest {
    @Test
    void testPrecioMiel() {

        Producto resultado = new Producto();      
        
        int numTarros = 12;
        float precioEsperado = 12 * 5.25f;

        float precioTotal = resultado.precioMiel(numTarros);

        assertEquals(precioEsperado, precioTotal, 0.01);

    }

    @Test
    void testPrecioPorGramoMortadela() {

        Producto resultado = new Producto();

        float cantidadDeGramos = 0.150f;
        float precioMortadela = 6.5f;

        float precioEsperado = precioMortadela * 0.150f;
        float precioTotal = resultado.precioPorGramoMortadela(cantidadDeGramos);

        assertEquals(precioEsperado, precioTotal, 0.01);
    }

    @Test
    void testPrecioPorUnidadSobao() {

        Producto resultado = new Producto();

        int cantidadDeUnidad = 16;
        float precioDeUnidad = 1.9f;

        float precioEsperado = cantidadDeUnidad *precioDeUnidad;

        float precioFinal = resultado.precioPorUnidadSobao(cantidadDeUnidad);

        assertEquals(precioEsperado, precioFinal, 0.01);

    }
}


