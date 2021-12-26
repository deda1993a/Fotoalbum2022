;N�V: Demeter D�vid
;AIS k�d: 127616
;"A" csoport

Code	Segment
	assume CS:Code, DS:Data, SS:Stack

Start:
	mov	ax, Code
	mov	DS, AX

; 1 ********************************
; �rja ki a k�perny�re az "Uzenet" tartalm�t!
; 1 pont
; 2 pont ha visszafele

		mov	ax, 3
		int	10h
		
		mov di, offset Uzenet
		
		mov	cx, 0
		
Szamol:
		mov al, [di]
		cmp al, "$"
		jz	kiir
		inc	di
		inc cx 
		jmp szamol
		
kiir:
	dec	di
	mov	dl, [di]
	mov ah, 2
	int	21h
	
	loop kiir
	
	




; 2 ********************************
; Sz�molja meg �s decim�lis alakban �rja ki 
; a k�perny�re az "Uzenet"-ben tal�lhat� "a" �s "A"  bet�k egy�ttes sz�m�t!
; Felt�telezhetj��k, hogy az Uzenet ��sszesen kevesebb, mint 10 darab
; "a" �s "A" bet�t tartalmaz. 
; 2 pont

	mov	ah, 2
	mov	dl, 10
	int	21h
	
	mov	cx, 0
	
	
	
Keres2:
		mov al, [di]
		cmp al, "$"
		

		
		jz	Szamol2
		inc	di
			
		cmp	al, "a"
		jnz Keres2
			
		
		inc cx 
		jmp Keres2
		
		cmp	al, "A"
		jnz Keres2			
		

Szamol2:
	add		cl, 48

	 dec	di
	 mov	dl, cl
	 mov    ah, 2
	 int	21h
	

	

	
	

	





; 3 ********************************
; Ciklus seg�ts�g�vel �rjon ki 
; 10 darab "*" karaktert egy sorba!
; 1 pont

	mov	ah, 2
	mov	dl, 10
	int	21h
	
	mov cx, 10
	
Kiir3:
		mov	ah, 2
		mov	dl, 42
		int	21h
	
	
	loop Kiir3




; 4 ********************************
; Ciklus seg�ts�g�vel �rja ki az ASCII karaktert�bla 
; 65-75-ig terjed� szimb�lumait!
; 1 pont
; 2 pont ha cs�kken� sorrend

	mov	ah, 2
	mov	dl, 10
	int	21h
	
	mov cx, 11
	mov bl, 75
	
Kiir4:
		

		mov	ah, 2
		mov	dl, bl
		int	21h
	
		dec bl
		
	
	loop Kiir4




; 5 ********************************
; �rja ki a k�perny�re az al�bbi m�velez eredm�ny�t: 
; Cl:=10; ch:=5; m�velet: cl+ch
; A ki�r�sn�l felhaszn�lhatjuk azt a t�nyt, 
; hogy az eredm�ny kisebb, mint 20 de nagyobb, mint 10! 
; 1 pont

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

Uzenet		db	"Ez a 2021-es ev A csoprt ZH feladata.$"


Code	Ends

Data	Segment

Data	Ends

Stack	Segment

Stack	Ends
	End	Start

