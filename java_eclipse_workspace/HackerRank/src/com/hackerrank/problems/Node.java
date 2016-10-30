package com.hackerrank.problems;

public class Node {
	int data;
	Node next;
	Node prev;
	
	public Node(){
		data = 0;
		next = prev = null;
	}
	
	public Node(int data){
		this.data = data;
	}
	
	public Node(int data, Node next){
		this.data = data;
		this.next = next;
	}
	
	public Node(int data, Node next, Node prev){
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
	
	public String toString(){
		return Integer.toString(data);
	}
	
	public String printList(){
		Node tmp = this;
		StringBuffer b = new StringBuffer();
		
		while(tmp != null) {
			b.append(tmp + "-->");
			tmp = tmp.next;
		}
		
		b.append("NULL");
		
		return b.toString(); 
	}
}