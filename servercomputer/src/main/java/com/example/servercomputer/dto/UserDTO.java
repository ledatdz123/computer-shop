package com.example.servercomputer.dto;

import java.time.LocalDate;
import java.util.*;

import com.example.servercomputer.entity.Role;
import com.example.servercomputer.entity.User;
import com.example.servercomputer.entity.entityenum.EGender;
import com.example.servercomputer.entity.entityenum.EStatusUser;

import lombok.Data;

@Data
public class UserDTO {
	private Long id;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private String address;
	private EGender gender;
	private LocalDate birthday;
	private EStatusUser status;
	private Set<String> roles;

	public UserDTO convertToDto(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setFirstName(user.getFirstName());
		userDTO.setLastName(user.getLastName());
		userDTO.setEmail(user.getEmail());
		userDTO.setPassword(user.getPassword());
		userDTO.setPhoneNumber(user.getPhoneNumber());
		userDTO.setAddress(user.getAddress());
		userDTO.setBirthday(user.getBirthday());
		userDTO.setGender(user.getGender());
		Set<String> roles = new HashSet<>();
		if(Objects.nonNull(user.getRoles())) {
			user.getRoles().forEach(r -> {
				roles.add(r.getRoleName());
			});
		}

		userDTO.setRoles(roles);

		return userDTO;
	}
	public User convertToEti(UserDTO userDTO) {
		User user = new User();

		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		userDTO.setAddress(user.getAddress());
		userDTO.setPhoneNumber(userDTO.getPhoneNumber());
		userDTO.setBirthday(user.getBirthday());
		userDTO.setGender(user.getGender());
//        Set<Role> roles = new HashSet<>();
//        userDTO.getRoles().forEach(r ->{
//            roles.add(r.get)
//        });
//        user.setRoles(userDTO.getRoles());

		return user;
	}
	public List<UserDTO> toListDto(List<User> listEntity) {
		List<UserDTO> listDto = new ArrayList<>();

		listEntity.forEach(e->{
			listDto.add(this.convertToDto(e));
		});
		return listDto;
	}
	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
}
