package src;

import java.math.BigDecimal;
import src.Recursao;
import java.util.ArrayList;
import java.util.Arrays;
public class test {
    private ArrayList<BigDecimal> produtos1 = new ArrayList();
    private ArrayList<BigDecimal> quantidade = new ArrayList<BigDecimal>();
 
	public static void main(String[] args) {
	    String produtos[][] = new String[100][3];
	    produtos[0][0] = "Arroz";
	    produtos[0][1] = "10 reais";
	    produtos[1][0] = "feij�o";
	    produtos[1][1] = "20 reais";
	    
	    for(int i = 0; i < produtos.length; i++) {
	    	 for(int j = 0; j < produtos[i].length; j++) {
	 			produtos[i][0] = "Produto";
	 			produtos[i][1] = "x reais";
	 			produtos[i][2] = "quantidade";
	    	 }
	    }
	    
	}
	Recursao recursao = new Recursao();

}

	