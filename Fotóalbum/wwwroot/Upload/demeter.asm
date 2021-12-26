;NÉV: Demeter Dávid
;AIS kód: 127616
;"A" csoport

Code	Segment
	assume CS:Code, DS:Data, SS:Stack

Start:
	mov	ax, Code
	mov	DS, AX

; 1 ********************************
; Írja ki a képernyõre az "Uzenet" tartalmát!
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
; Számolja meg és decimális alakban írja ki 
; a képernyõre az "Uzenet"-ben található "a" és "A"  betûk együttes számát!
; Feltételezhetjüük, hogy az Uzenet öösszesen kevesebb, mint 10 darab
; "a" és "A" betût tartalmaz. 
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
; Ciklus segítségével írjon ki 
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
; Ciklus segítségével írja ki az ASCII karaktertábla 
; 65-75-ig terjedõ szimbólumait!
; 1 pont
; 2 pont ha csökkenõ sorrend

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
; Írja ki a képernyõre az alábbi mûvelez eredményét: 
; Cl:=10; ch:=5; mûvelet: cl+ch
; A kiírásnál felhasználhatjuk azt a tényt, 
; hogy az eredmény kisebb, mint 20 de nagyobb, mint 10! 
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

