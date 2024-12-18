package es.santander.ascender;

public class Producto {

    private float tarroDeMiel = 5.25f;
    private float mortadelaSalamiKg = 6.5f;
    private float sobaosElMacho = 1.9f;

    private int cantidadTarroMiel = 1000;
    private int cantidadMortadelaGramos = 10000;
    private int cantidadDeSobao = 2000;

    public float precioMiel(int cantidadSolicitada) {

        if (cantidadSolicitada > cantidadTarroMiel) {
            throw new IllegalArgumentException("No hay stock");
        }

        return tarroDeMiel * cantidadSolicitada;

    }

    public float precioPorGramoMortadela(float cantidadSolicitada) {

        if (cantidadSolicitada > cantidadMortadelaGramos) {
            throw new IllegalArgumentException("No hay stock");
        }

        float precioPorGramo = mortadelaSalamiKg / 1000;

        return precioPorGramo * cantidadSolicitada;

    }

    public float precioPorUnidadSobao(int cantidadSolicitada) {

        if (cantidadSolicitada > cantidadDeSobao) {
            throw new IllegalArgumentException("No hay stock");
        }

        return sobaosElMacho * cantidadSolicitada;

    }

}
