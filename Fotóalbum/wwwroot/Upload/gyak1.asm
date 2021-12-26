
Code	Segment
	assume CS:Code, DS:Data, SS:Stack

Start:
	mov	ax, Code
	mov	DS, AX
	
	mov ax, 3
	int 10h
	
	mov dh, 0
	

	

	mov di, offset Uzenet

	
	mov	cx, 0
	
	
	
Keres:
		mov al, [di]
		cmp al, "$"
		

		
		jz	Terminalo
		inc	di
		inc cx 
		jmp Keres
		

Terminalo:
			sub		di, 4

			dec	di
			mov	dl, [di]
			mov    ah, 2
			int	21h
	

	

	
	


	
	






Program_Vege:
	mov	ax, 4c00h
	int	21h

Uzenet db "1,2,3,4,5,6,7,8,9,0$"



Code	Ends

Data	Segment

Data	Ends

Stack	Segment

Stack	Ends
	End	Start


