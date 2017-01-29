package net.mzouabi.ng2.server.mapper;

import javax.annotation.Generated;
import net.mzouabi.ng2.server.dto.PersonDTO;
import net.mzouabi.ng2.server.model.Person;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2017-01-28T19:16:06+0530",
    comments = "version: 1.0.0.Final, compiler: javac, environment: Java 1.8.0_60 (Oracle Corporation)"
)
@Component
public class PersonMapperImpl implements PersonMapper {

    @Override
    public PersonDTO toDTO(Person person) {
        if ( person == null ) {
            return null;
        }

        PersonDTO personDTO = new PersonDTO();

        personDTO.setId( person.getId() );
        personDTO.setFirstname( person.getFirstname() );
        personDTO.setLastname( person.getLastname() );
        personDTO.setAge( person.getAge() );

        return personDTO;
    }

    @Override
    public Person toEntity(PersonDTO person) {
        if ( person == null ) {
            return null;
        }

        Person person_ = new Person();

        person_.setId( person.getId() );
        person_.setFirstname( person.getFirstname() );
        person_.setLastname( person.getLastname() );
        person_.setAge( person.getAge() );

        return person_;
    }

    @Override
    public void mapToEntity(PersonDTO personDTO, Person person) {
        if ( personDTO == null ) {
            return;
        }

        person.setId( personDTO.getId() );
        person.setFirstname( personDTO.getFirstname() );
        person.setLastname( personDTO.getLastname() );
        person.setAge( personDTO.getAge() );
    }
}
