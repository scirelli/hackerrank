package com.hackerrank.problems;

import java.util.Stack;

public class Main {
	public static void main(String[] args) {
		diagonalDifference();
	}

	static void diagonalDifference(){
		int	d1=0, d2=0, n=3;
		int a[][] = {
				{11,2,4},
				{4,5,6},
				{10,8,-12}
		};
		
		for(int i=0; i<n; i++){
			d1 += a[i][i];
			d2 += a[i][(n-1)-i];                
		}
		System.out.println(Math.abs(d1-d2));
	}
	
	static void insertANode(){
		Node head = new Node();
		head.data = 5;
		head.next = new Node(3);
		
		System.out.println(insertNth(head, 1, 1).printList());
	}
	static Node insertNth(Node head, int data, int position) {
	    Node tmp = head,
	         prev = head;
	    
	    if(head == null || position == 0){
	       head = new Node();
	       head.data = data;
	       head.next = tmp;
	       return head;
	   }
	   
	   while(position > 0 && tmp != null ){
	       prev = tmp;
	       tmp = tmp.next;
	       position--;
	   }

	   prev.next = new Node();
	   prev.next.data = data;
	   prev.next.next = tmp;
	    
	   return head;
	}	

	static void heightOfABinaryTree() {
		Node root = new Node(3, new Node(2, new Node(1)), new Node(5, new Node(4), new Node(6, null, new Node(7))));
		System.out.println(height(root));
	}
	
	static int height(Node root){
		return maxHeight(root, 0);
	}
	
	static int maxHeight( Node root, int currentHeight ){
		int leftHeight = 0,
			rightHeight = 0;
		
		if(root == null) return currentHeight-1;
		
		leftHeight = maxHeight(root.next, currentHeight+1);
		rightHeight = maxHeight(root.prev, currentHeight+1);
		
		return Math.max(leftHeight, rightHeight);
	}

	static void mergeTwoLinkedLists(){
		Node headA1 = new Node(1, new Node(3, new Node(5, new Node(6)))),
			 headB1 = new Node(2, new Node(4, new Node(7))),

			 headA2 = new Node(15),
			 headB2 = new Node(12),
			 
			 headA3 = null,
			 headB3 = new Node(1, new Node(2)),
			 
			 headA4 = new Node(2),
			 headB4 = new Node(1, new Node(2)),
			 
			 headA5 = new Node(1, new Node(3, new Node(5, new Node(6)))),
			 headB5 = new Node(8, new Node(9, new Node(11, new Node(15)))),
			 
			 headA6 = new Node(8, new Node(9, new Node(11, new Node(15)))),
			 headB6 = new Node(1);
		
		print(mergeLists(headA5, headB5));
	}
	
	/**
	 * 1 -> 3 -> 5 -> 6 -> NULL
	 * 2 -> 4 -> 7 -> NULL
	 *
	 * 15 -> NULL
	 * 12 -> NULL
	 *
	 * NULL 
	 * 1 -> 2 -> NULL
	 * 
	 * 2 -> NULL
	 * 1 -> 2 -> NULL
	 * 
	 * 1 -> 3 -> 5 -> 6 -> NULL
	 * 8 -> 9 -> 11 -> 15 -> NULL
	 * 
	 * 8 -> 9 -> 11 -> -> 15 -> NULL
	 * 1 -> NULL
	 * 
	 * @param headA
	 * @param headB
	 * @return
	 */
	static Node mergeLists( Node headA, Node headB ){
		if( headA == null ) return headB;
		if( headB == null ) return headA;
		
		if( headA.data < headB.data ){
			headA.next = mergeLists( headA.next, headB );
			return headA;
		}else{
			headB.next = mergeLists( headA, headB.next);
			return headB;
		}
	}

	static Node mergeListsIterative( Node headA, Node headB ){
		if( headA == null ) return headB;
		if( headB == null ) return headA;
		
		if( headA.data < headB.data ){
			headA.next = mergeLists( headA.next, headB );
			return headA;
		}else{
			headB.next = mergeLists( headA, headB.next);
			return headB;
		}
	}

	static void findMergeNode(){
		Node headA = new Node(0),
		 	 headB = new Node(0),
		 	 mergeNode = new Node(2, new Node(3, new Node(4)));
		headA.next = new Node(1, mergeNode);
		headB.next = new Node(1, mergeNode);
		headB.next = mergeNode;

		System.out.println(findMergeNode(headA, headB));
	}

	static int findMergeNode(Node headA, Node headB) {
		Stack<Node> stackA = new Stack(),
			  stackB = new Stack();
		Node prevA = null,
			 prevB = null;
		
		while( headA != null ){
			stackA.push(headA);
			headA = headA.next;
		}
		while( headB != null ){
			stackB.push(headB);
			headB = headB.next;
		}
		
		while( !stackA.isEmpty() && !stackB.isEmpty()){
			if( stackA.peek() != stackB.peek() ){
				return prevA.data;
			}
			prevA = stackA.pop();
			prevB = stackB.pop();
		}
		return -1;
	}

	static void printHasCycle(){
		Node noCycleHead = new Node(1, new Node(2, new Node(3, new Node(4, new Node(5))))),
			 nullHead = null,
			 cycleHead = new Node(1),
			 node2 = new Node(2),
			 node3 = new Node(3),
			 node4 = new Node(4),
			 node5 = new Node(5);
			 
		cycleHead.next = node2;
		node2.next = node2;
		node3.next = node4;
		node5.next = node5;
		node5.next = node2;
		
		if(hasCycle(cycleHead) == 0){
			System.out.println("No cycle");
		}else{
			System.out.println("Cycle");
		}
	}
	
	static int hasCycle(Node head) {
		Node fast = head,
			 slow = head;

		while(fast != null && fast.next != null && fast.next.next != null){
			slow = slow.next;
			fast = fast.next.next;

			if( fast == slow ) return 1;
		}
		
		return 0;
		//1 --> 2 --> 3
	    //      ^     |
	    //      |     |
	    //       -----
		//
		//1 --> 2 --> 3 --> 4 --> 5
		//      ^                 |
		//      |                 |
		//       -----------------
		//
		// 1 --> 2 --> 3 --> 4 --> 5 --> NULL
	}
	
	static void printSotredNode(){
		Node one = new Node(),
			 two = new Node(),
			 three = new Node();
		
			one.data = 2;
			two.data = 4;
			three.data = 6;
			
			one.next = two;
			two.prev = one;
			two.next = three;
			three.prev = two;
			
			print(sortedInsert(new Node(1),5));
	}
	
	static Node sortedInsert(Node head,int data) {
	    Node n = new Node(),
	        tmpHead = head,
	        prev = head.prev;
	    n.data = data;
	    
	    if( head == null ){
	        return n;
	    }
	    if( data <= head.data){
	    	n.next = head;
	    	head.prev = n;
	    	return n;
	    }
	    while(tmpHead != null){
	        if( data <= tmpHead.data ){
	            n.prev = tmpHead.prev;
	            n.next = tmpHead;
	            n.prev.next = n;
	            tmpHead.prev = n;
	            return head;
	        }
	        prev = tmpHead;
	        tmpHead = tmpHead.next;
	    }
	    prev.next = n;
	    n.prev = prev;
	    return head;
	}
	
	public static void previousProblem(){
		Node head = new Node(),
			     tmp = head, tmp2 = null;
			
			for(int i=1; i<10; i++){
				tmp2 = new Node();
				tmp2.data = i;
				tmp2.prev = tmp;
				tmp.next = tmp2;
				tmp = tmp2;
			}
			print(head);
			print( reverse(head) );
	}
	
	public static void print( Node head ){
		while(head != null){
			System.out.print(head + ",");
			head = head.next;
		}
		System.out.println("\n");
	}
	
	public static Node reverse(Node head) {
	    Node tmpNode = null;
	    while(head != null){
	        tmpNode = head.prev;
	        head.prev = head.next;
	        head.next = tmpNode;
	        tmpNode = head;
	        head = head.prev;
	    }
	    return tmpNode;
	}
}