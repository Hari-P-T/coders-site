#include<stdio.h>
#include<stdlib.h>

int main()
{
    FILE *fp;
    unsigned char ch;
    /* file 'abc.c' contains "This is IndiaBIX " */
    fp=fopen("ctrl.txt", "r");
    if(fp == NULL)
    {
        printf("Unable to open file");
        exit(1);
    }
    while(!feof(fp))
    {
        ch = getc(fp);
        if(ch != EOF)
            printf("%c", ch);
    }

    fclose(fp);
    printf("\n");
    return 0;
}
