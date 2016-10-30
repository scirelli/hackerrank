package com.scirelli.hackerrank.problems;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class main {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String line = br.readLine();
		int numberOfTestCases = Integer.parseInt(line);
		line = br.readLine();
		numberOfTestCases = Integer.parseInt(line);
		
		System.out.println(numberOfTestCases);
		for(int i=0, initNumberOfPiles=0; i<numberOfTestCases; i++){
			line = br.readLine();
			initNumberOfPiles = Integer.parseInt(line);
			
		}
	}

}
