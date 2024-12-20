package es.santander.ascender;

public class Producto {

    
    private final float[] precios = {5.25f, 6.5f, 1.9f}; 
    private final int[] cantidades = {1000, 10000, 2000}; 

    private static final int TarroDeMiel = 0;
    private static final int Mortadela= 1;
    private static final int Sobao = 2;

   
    public float precioMiel(int cantidadSolicitada) {
        validarStock(TarroDeMiel, cantidadSolicitada);
        return precios[TarroDeMiel] * cantidadSolicitada;
    }

    public float precioPorGramoMortadela(float cantidadSolicitada) {
        validarStock(Mortadela, cantidadSolicitada);
        float precioPorGramo = precios[Mortadela] / 1000; 
        return precioPorGramo * cantidadSolicitada;
    }

    public float precioPorUnidadSobao(int cantidadSolicitada) {
        validarStock(Sobao, cantidadSolicitada);
        return precios[Sobao] * cantidadSolicitada;
    }

    
    private void validarStock(int indiceProducto, float cantidadSolicitada) {
        if (cantidadSolicitada > cantidades[indiceProducto]) {
            throw new IllegalArgumentException("No hay stock");
        }
    }
}
