
Code	Segment
	assume CS:Code, DS:Data, SS:Stack

Start:
	mov	ax, Code
	mov	DS, AX


	mov	ah, 2
	mov	dl, 10
	int	21h
	
	mov cl, 10
	mov ch, 5
	
	add cl, ch
	
	mov al, cl
	mov bl, 10
	        
	mov ah, 0        
	div	bl
	
	mov bl, al
	mov bh, ah
	
	add bl, 48
	add bh, 48
	
	mov	ah, 2
	mov	dl, bl
	int	21h	
	
	mov	ah, 2
	mov	dl, bh
	int	21h		










Program_Vege:
	mov	ax, 4c00h
	int	21h



Code	Ends

Data	Segment

Data	Ends

Stack	Segment

Stack	Ends
	End	Start

