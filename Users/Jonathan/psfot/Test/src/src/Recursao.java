package src;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Recursao {
    private static ArrayList<BigDecimal> produtos1 = new ArrayList<BigDecimal>(); 
    private static ArrayList<BigDecimal> quantidade = new ArrayList<BigDecimal>();
    
    public Recursao() {
        Recursao.produtos1 = new ArrayList<BigDecimal>();
        Recursao.quantidade = new ArrayList<BigDecimal>();
    }

    public static void adiciona() {
    	produtos1.add(new BigDecimal(10));
    	produtos1.add(new BigDecimal(20));
    	produtos1.add(new BigDecimal(30));
    	quantidade.add(new BigDecimal(10));
    	quantidade.add(new BigDecimal(2));
    	quantidade.add(new BigDecimal(2));
    }
    
	public static BigDecimal total(int index, BigDecimal valor) {
		BigDecimal preco = valor;
    	if(index == produtos1.size()) {
    		return valor;
    	}
        return total(index + 1, preco.add(produtos1.get(index).multiply(quantidade.get(index))));
    }
	
	public static ArrayList<BigDecimal> getprod() {
		return produtos1;
	}
	public static ArrayList<BigDecimal> getprod2() {
		return quantidade;
	}
	
	public static void main(String[] args) { 
		adiciona();
		System.out.println(getprod().toString());
		System.out.println(getprod2().toString());
		System.out.println(total(0, new BigDecimal(0)));
		
	}
	
}