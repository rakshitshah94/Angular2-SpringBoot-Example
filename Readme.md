<h1>Angular2-springboot</h1>
This example shows how to use angular 2 application with java Spring MVC with help of RestController.<br>

Here you can see following things.<br>
<p><b>Server Side<b></p>
<ul>
<li>SpringBoot</li>
<li> Maven 3+ </li>
<li> JAVA 8 </li>
<li>Spring MVC architecture</li>
<li>RestController</li>
<li>Mysql Database | H2 Database</li>
</ul>

<p><b>Frontend side<b></p>

<ul>
<li>Angular2 Components</li>
<li>Pagination</li>
<li> Modal </li>
<li>CRUD Functionality (Create, Read(view/display), Update, Delete)</li>
<li>Single Page Application</li>
<li>Routing | Router outlet | Router</li>
</ul>
<br>

<h1>How to Setup this project </h1>

<h2> Backend </h2>
<ul> 
<li>Maven 3+</li>
<li>Java 8 </li>
</ul>

<h2> Frontend </h2>
<ul>
<li>Clone project, Open cmd or Node js Command prompt</li>
<li><code>npm install -g angular-cli </code> to install angular 2 cli ( globally ) </li>
<li><code>npm install</code> to install Node packages</li>
</ul>

<h1>How to Run </h1>

<h2> Backend </h2>
<ul> 
<li><code>mvn clean install</code> to clean if exists files and install packages</li>
<li><code>mvn spring-boot:run</code>  to start spring boot</li>
</ul>

<h2> Frontend </h2>
<ul>
<li><code>ng serve</code></li>
</ul>

<h1>Screenshots of Demo</h1>
<img src ="https://1.bp.blogspot.com/-GVlbesjuLxM/WMGqyMxk6EI/AAAAAAAAJoA/7EQPqPxKC78RZcw2uHyookpyreCpI_ezwCLcB/s1600/SpringAngular2.png" alt="SpringBoot+Angular2 Application">
<center><label>Angular2+SpringBoot+Mysql CRUD Example</label></center><br>
<img src ="https://1.bp.blogspot.com/-NV9gJsopRA4/WMGqw-LD8VI/AAAAAAAAJn0/6zrPKepQSO4gLq07x8IrBo2U48ZD-ymJQCLcB/s1600/SpringAngular2-1.png" alt="Read/View Person Details">
<center><label>Detail/View person</label></center><br>
<img src="https://3.bp.blogspot.com/-ntYPzTZHXo8/WMGqxRTXtOI/AAAAAAAAJn4/PxrYYgdjuQY1NI6f1ChLlBwLbBz0vJbtACLcB/s1600/SpringAngular2-2.png" alt="delete person">
<center><label>Delete person</label></center><br>
<img src ="https://3.bp.blogspot.com/-b9yRyD0r9Ec/WMGqxb2pz0I/AAAAAAAAJn8/1EE_PkkMzoQBuGVbEUpcjERL5fxPMsc4ACLcB/s1600/SpringAngular2-3.png" alt="Edit person"
<center><label>Edit person</label></center><br>

<h3>Guide to Build and Run Project</h3>
When you Import this project, You need to fulfill the requirements.

**If you have imported project in eclipse, Follow this steps to build project:**
1. Right click on project > Properties > **Java Build path**
2. Change your **JDK if 1.8 is not set.**
3. You need **Maven 3+** configured in your system (or You can download Maven 3+ from [here](https://maven.apache.org/download.cgi))
4. Once you setup with all this things,
Right click on project > Run as > Maven clean (you can directly do this using **mvn clean** command in cmd at specific project dir)
5. Again right click on project, Find **Maven >** in options, Click on **Update project**
check **Update snapshots forcefully** option and press ok.
6. Now you can refresh your project. Run clean and build project.
7. **Main Important step >** Right click on project > Run as  > **Maven Install**
 This step will install required dependency specified in [pom.xml](https://github.com/rakshitshah94/Angular2-SpringBoot-Example/blob/master/server/pom.xml) file

Now as per your question, **QPerson is missing**
Once you follow above steps it will be generated automatically in 
../Project_Dir/target/net/../server/model/QPerson.java

**You may have question that how this was generated ?**
If you observed libraries (Dependencies) in pom.xml ,
```
<dependency>
	<groupId>com.h2database</groupId>
	<artifactId>h2</artifactId>
	<scope>runtime</scope>
</dependency>
```
You need to know more about [H2 Database](https://en.wikipedia.org/wiki/H2_(DBMS)). 
H2 is a relational database management system written in Java. It can be embedded in Java applications or run in the client-server mode.
- Very fast, open source, JDBC API
- Embedded and server modes; in-memory databases (Simple meaning => data will not persist on the disk)
- lightweight Java database
- It can be embedded in Java applications or run in the client-server mode
Whatever things (Objects, String or anything) you want to store in **H2** you can.
In this example, whatever values you want to store (CRUD operations), it will be retain in H2 Database till you shutdown your tomcat.(or other servers). 
Hope so you will get idea about this things. 
<hr>
<h3 style="color:red" >References:</h3>
<p>This example is made with help of <a href="https://github.com/zouabimourad/angular2-spring">zouabimourad - SpringBoot and Angular 2</a> 
and <a href="http://websystique.com/springmvc/spring-mvc-4-and-spring-security-4-integration-example/">websystique | UI made in angular 1</a></p>

<h2>How to Contribute</h2>
If you like this Example and you want help and keep this project successful then contribute your time to improve the source code and let other know about Angular 2. Because this build for newbies to undestand the flow of CRUD with Angular2-Spring.
