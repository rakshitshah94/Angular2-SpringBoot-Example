package net.mzouabi.ng2.server.model;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QPerson is a Querydsl query type for Person
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QPerson extends EntityPathBase<Person> {

    private static final long serialVersionUID = 1622795974L;

    public static final QPerson person = new QPerson("person");

    public final QAbstractEntity _super = new QAbstractEntity(this);

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final StringPath firstname = createString("firstname");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath lastname = createString("lastname");

    //inherited
    public final NumberPath<Integer> version = _super.version;

    public QPerson(String variable) {
        super(Person.class, forVariable(variable));
    }

    public QPerson(Path<? extends Person> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPerson(PathMetadata<?> metadata) {
        super(Person.class, metadata);
    }

}

