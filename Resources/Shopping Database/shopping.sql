PGDMP         8                z            shopping    13.5    13.5 ,    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16430    shopping    DATABASE     l   CREATE DATABASE shopping WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE shopping;
                postgres    false            ?           0    0    DATABASE shopping    ACL     1   GRANT ALL ON DATABASE shopping TO shopping_user;
                   postgres    false    3040            ?            1259    16782 
   migrations    TABLE     ?   CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    shopping_user    false            ?            1259    16780    migrations_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          shopping_user    false    201            ?           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          shopping_user    false    200            ?            1259    16824    order_products    TABLE     ?   CREATE TABLE public.order_products (
    id integer NOT NULL,
    quantity integer,
    order_id bigint,
    product_id bigint
);
 "   DROP TABLE public.order_products;
       public         heap    shopping_user    false            ?            1259    16822    order_products_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.order_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.order_products_id_seq;
       public          shopping_user    false    209            ?           0    0    order_products_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.order_products_id_seq OWNED BY public.order_products.id;
          public          shopping_user    false    208            ?            1259    16811    orders    TABLE     n   CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id bigint,
    status character varying(16)
);
    DROP TABLE public.orders;
       public         heap    shopping_user    false            ?            1259    16809    orders_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          shopping_user    false    207            ?           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          shopping_user    false    206            ?            1259    16790    products    TABLE     ?   CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price integer NOT NULL,
    category character varying(64)
);
    DROP TABLE public.products;
       public         heap    shopping_user    false            ?            1259    16788    products_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          shopping_user    false    203            ?           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          shopping_user    false    202            ?            1259    16798    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    user_name character varying(100) NOT NULL,
    password_digest character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    shopping_user    false            ?            1259    16796    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          shopping_user    false    205            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          shopping_user    false    204            ;           2604    16785    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          shopping_user    false    200    201    201            ?           2604    16827    order_products id    DEFAULT     v   ALTER TABLE ONLY public.order_products ALTER COLUMN id SET DEFAULT nextval('public.order_products_id_seq'::regclass);
 @   ALTER TABLE public.order_products ALTER COLUMN id DROP DEFAULT;
       public          shopping_user    false    209    208    209            >           2604    16814 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          shopping_user    false    207    206    207            <           2604    16793    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          shopping_user    false    203    202    203            =           2604    16801    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          shopping_user    false    205    204    205            ?          0    16782 
   migrations 
   TABLE DATA           6   COPY public.migrations (id, name, run_on) FROM stdin;
    public          shopping_user    false    201   0       ?          0    16824    order_products 
   TABLE DATA           L   COPY public.order_products (id, quantity, order_id, product_id) FROM stdin;
    public          shopping_user    false    209   ?0       ?          0    16811    orders 
   TABLE DATA           5   COPY public.orders (id, user_id, status) FROM stdin;
    public          shopping_user    false    207   ?0       ?          0    16790    products 
   TABLE DATA           =   COPY public.products (id, name, price, category) FROM stdin;
    public          shopping_user    false    203   1       ?          0    16798    users 
   TABLE DATA           V   COPY public.users (id, first_name, last_name, user_name, password_digest) FROM stdin;
    public          shopping_user    false    205   ?1       ?           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);
          public          shopping_user    false    200            ?           0    0    order_products_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.order_products_id_seq', 7, true);
          public          shopping_user    false    208            ?           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 21, true);
          public          shopping_user    false    206            ?           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 20, true);
          public          shopping_user    false    202            ?           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 41, true);
          public          shopping_user    false    204            A           2606    16787    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            shopping_user    false    201            K           2606    16829 "   order_products order_products_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_pkey;
       public            shopping_user    false    209            I           2606    16816    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            shopping_user    false    207            C           2606    16795    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            shopping_user    false    203            E           2606    16806    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            shopping_user    false    205            G           2606    16808    users users_user_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_name_key;
       public            shopping_user    false    205            M           2606    16830 +   order_products order_products_order_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);
 U   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_order_id_fkey;
       public          shopping_user    false    209    207    2889            N           2606    16835 -   order_products order_products_product_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 W   ALTER TABLE ONLY public.order_products DROP CONSTRAINT order_products_product_id_fkey;
       public          shopping_user    false    203    209    2883            L           2606    16817    orders orders_user_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          shopping_user    false    207    205    2885            ?   g   x?}?A@@?ᵞ?J??3?Y??&???X?ۗ?K?5?V?$^?<?ö??b?(?]?:???@xw??)??Ж??Gq???	,Ps?&??7?+": M.[      ?   0   x?3?42?4".Ӕ?? ?4?2?4?,??9?9?9͹b???? ?c?      ?   <   x?34?44?LL.?,K?24q??srRK?\SNC????m??΀??g?db? =;?      ?   ?   x?u?An?0E?ߧ?	*? 7?b]t?M 3?@%??ܾPM;U%v?????crv`4&+?ȎN???o?3?8B???D%R????wp???*??
mdӣ???^?x??+?igN? ???.???vLۑ?;+>?2S?u#?,C痰
G?&????~????moM??/?x~Q?8???|???G^?7i|?$?ý?V?>&?????p?9J????퉈? 
u?      ?     x?u?I??J?????53K? ?B?x?d?D}[?V??????\|??97?u??s0??
????"ߎe:js??ي??????5D8<1???{??R.?F?Hy?????k?!0?8???_?v-??~?c?H?d7?}???5Q??^?^??ɖ?#f?lKwc? ??E?۸?<5M?fH{<??/x????f?P[?;s#??0=3??:D<??U?.??w=?*	5E?]ӄ@??q ??/`??ф?])??S??q?S?)?S1?'?Ĳ\??^??|"j?	???u??_r;=?}1?M??2TcS?????%]?*x?V???g?r
?xS??LoQE???Q48?;??
F?0a??ŏS?Uo????{ߑ?=?{?訜[N?[p??SSM???eX?<F? 	?0?mu???e?E? ?S?????\??ߪs3Lgw&B+u???x?]?|Q????y??1??;????p???6?ل?o?Y??a??=0????Ĝ??/?Q[?,????????uʇw????????q?ɹIV?p?k?'?l?ʸ?[
ѧy?n?X̀??\	h??[???d?}Y[_u?+???)????@v???U5?-_?E??@?'K?a??,????6????????=@?c????7J??Z;]H??t?s7???l??P>h?(kn??\????????c??`???;????NS?%P???.?c?g?ݲ?GH?W\w?O2koh1?Q:-?I~<?Ȟ3?ͼ?teEڮ??a?Tw?$̴s??F ?3bn?ˌ??C???????貒??n?xϮ?O???/(???#?9?w?V???D?BϤ7?L??$~f8v.?}??W???"^?A???V?|=?Wr??r8??vpγKS+??a?/8٩?     